import * as React from 'react';
import isEqual from 'lodash-es/isEqual';
import autobind from 'autobind-decorator';
import Map from './Map';

declare const daum: any;

type latLng = { roadAddr?: string; jibunAddr?: string; lat: number; lng: number };
type bounds = { n: number; e: number; s: number; w: number };

type mapPositionInfo = {
  bounds: bounds;
  zoomLevel: number;
  center: latLng;
};

export interface IProps {
  className?: string;
  initialOption?: { center?: latLng; level?: number };
  maxZoomLevel?: number;
  minZoomLevel?: number;
  onMapReady?: (info: mapPositionInfo) => void;
  onChangeRegion?: (info: mapPositionInfo) => void;
  onChangeRegionComplete?: (info: mapPositionInfo) => void;
  onChangeMarkerPosition?: (position: latLng) => void;
  center?: { lat: number; lng: number };
  address?: string;
  data: any | null;
  readOnly?: boolean;
}

export interface IState {
  place: any;
  isVisiblePlaceInfo: boolean;
}

class MapContainer extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    onMapReady: () => {},
    onChangeRegion: () => {},
    onChangeRegionComplete: () => {},
    onChangeMarkerPosition: () => {},
    data: [],
    readOnly: false
  };

  private mapRef: React.RefObject<HTMLDivElement> = React.createRef();
  private map: any;
  private marker: any;
  private geocoder: any;
  private clusterer: any;

  public state: IState = {
    place: null,
    isVisiblePlaceInfo: false
  };

  static matchBoundsKey(bounds) {
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();
    return { n: neLatLng.getLat(), e: neLatLng.getLng(), s: swLatLng.getLat(), w: swLatLng.getLng() };
  }

  static mathCenterKey(center) {
    return { lat: center.getLat(), lng: center.getLng() };
  }

  public async componentDidMount() {
    const scriptId = 'kakao_map';
    const isExist = !!document.getElementById(scriptId);

    if (!isExist) {
      const script = document.createElement('script');
      script.src =
        '//dapi.kakao.com/v2/maps/sdk.js?appkey=426c6c635f09d632be5a5ee00232f878&libraries=services,clusterer,drawing&autoload=false';
      script.onload = () => daum.maps.load(() => this.onInit());
      script.id = scriptId;
      document.body.appendChild(script);
    } else {
      daum.maps.load(() => this.onInit());
    }
  }

  public componentDidUpdate(prevProps) {
    this.setMinMax();
    this.updateData(prevProps);
    this.updateCenter(prevProps);
    this.updateMarkerFromDetailAddr(prevProps);
  }

  get region() {
    return {
      bounds: MapContainer.matchBoundsKey(this.map.getBounds()),
      zoomLevel: this.map.getLevel(),
      center: MapContainer.mathCenterKey(this.map.getCenter())
    };
  }

  private async onInit() {
    let center: latLng | undefined;
    let level: number | undefined;
    try {
      center = await this.getCurrentLocation();
    } catch (e) {
      // nothing to do
    }
    if (this.props.initialOption) {
      const { center: initialCenter, level: initialLevel } = this.props.initialOption;
      initialCenter && (center = initialCenter);
      initialLevel && (level = initialLevel);
    }
    const { lat, lng } = center || { lat: 37.566826, lng: 126.9786567 }; // default: 서울시청

    // 지도를 생성합니다
    this.map = new daum.maps.Map(this.mapRef.current, {
      center: new daum.maps.LatLng(lat, lng),
      level
    });

    // 주소-좌표 변환 객체를 생성합니다
    this.geocoder = new daum.maps.services.Geocoder();

    if (!this.props.readOnly && (!this.props.data || !this.props.data.length)) {
      // 지도를 클릭한 위치에 표출할 마커입니다
      this.marker = new daum.maps.Marker();
      // 지도에 마커를 표시합니다
      this.marker.setMap(this.map);
    }

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    const mapTypeControl = new daum.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // daum.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    this.map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new daum.maps.ZoomControl();
    this.map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
    this.map.setZoomable(false);

    this.registerMarkers();
    this.registerSubscribes();
  }

  private registerMarkers() {
    if (!this.props.data) {
      return;
    }
    if (!this.clusterer) {
      // 마커 클러스터러를 생성합니다
      this.clusterer = new daum.maps.MarkerClusterer({
        map: this.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 10 // 클러스터 할 최소 지도 레벨
      });
    } else {
      this.clusterer.clear();
    }
    const markers = this.props.data.map(data => {
      const position = new daum.maps.LatLng(data.lat, data.lng);
      const marker = new daum.maps.Marker({
        position
      });
      const photos = (data.posts || []).flatMap(post => post.photos.map(photo => ({ ...photo, postId: post.id })));
      // 마커에 클릭이벤트를 등록합니다
      daum.maps.event.addListener(marker, 'click', () => {
        this.setState({
          isVisiblePlaceInfo: true,
          place: {
            ...data,
            photos
          }
        });
      });
      return marker;
    });
    // 클러스터러에 마커들을 추가합니다
    this.clusterer.addMarkers(markers);
  }

  private registerSubscribes() {
    this.setMinMax();
    this.props.onMapReady && this.props.onMapReady(this.region);
    daum.maps.event.addListener(this.map, 'bounds_changed', () => {
      this.props.onChangeRegion && this.props.onChangeRegion(this.region);
    });
    daum.maps.event.addListener(this.map, 'idle', () => {
      this.props.onChangeRegionComplete && this.props.onChangeRegionComplete(this.region);
    });
    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    daum.maps.event.addListener(this.map, 'click', e => {
      if (!this.marker) {
        return;
      }
      // 클릭한 위도, 경도 정보를 가져옵니다
      this.searchDetailAddrFromCoords(e.latLng, (result, status) => {
        if (status === daum.maps.services.Status.OK) {
          const roadAddr = !!result[0].road_address ? result[0].road_address.address_name : '';
          const jibunAddr = result[0].address.address_name;

          // 마커를 클릭한 위치에 표시합니다
          this.marker.setPosition(e.latLng);
          this.marker.setMap(this.map);

          if (this.props.onChangeMarkerPosition) {
            this.props.onChangeMarkerPosition({
              roadAddr,
              jibunAddr,
              lat: e.latLng.getLat(),
              lng: e.latLng.getLng()
            });
          }
        }
      });
    });

    if (this.props.address) {
      this.searchCoordFromDetailAddr(this.props.address);
    }
  }

  private getCurrentLocation(): Promise<latLng> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          error => {
            // error.code can be:
            //   0: unknown error
            //   1: permission denied
            //   2: position unavailable (error response from location provider)
            //   3: timed out
            reject(error);
          }
        );
      } else {
        reject(new Error('not supported geolocation.'));
      }
    });
  }

  private updateData(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.registerMarkers();
    }
  }

  private updateCenter(prevProps) {
    const { center } = this.props;
    if (center && !isEqual(prevProps.center, center)) {
      this.map.setCenter(new daum.maps.LatLng(center.lat, center.lng));
    }
  }

  private updateMarkerFromDetailAddr(prevProps) {
    if (prevProps.address !== this.props.address) {
      this.searchCoordFromDetailAddr(this.props.address);
    }
  }

  private setMinMax() {
    if (this.map) {
      this.props.maxZoomLevel && this.map.setMinLevel(this.props.maxZoomLevel);
      this.props.minZoomLevel && this.map.setMaxLevel(this.props.minZoomLevel);
    }
  }

  private searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    this.geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  private searchCoordFromDetailAddr(address) {
    this.geocoder.addressSearch(address, (result, status) => {
      // 정상적으로 검색이 완료됐으면
      if (status === daum.maps.services.Status.OK) {
        const coords = new daum.maps.LatLng(result[0].y, result[0].x);
        // 클릭한 위도, 경도 정보를 가져옵니다
        this.searchDetailAddrFromCoords(coords, (result, status) => {
          if (status === daum.maps.services.Status.OK) {
            const roadAddr = !!result[0].road_address ? result[0].road_address.address_name : '';
            const jibunAddr = result[0].address.address_name;

            // 마커를 클릭한 위치에 표시합니다
            this.marker.setPosition(coords);
            this.map.setCenter(coords);

            if (this.props.onChangeMarkerPosition) {
              this.props.onChangeMarkerPosition({
                roadAddr,
                jibunAddr,
                lat: coords.getLat(),
                lng: coords.getLng()
              });
            }
          }
        });
      }
    });
  }

  @autobind
  private onCloseMapPlaceModal() {
    this.setState({ isVisiblePlaceInfo: false });
  }

  public render() {
    return (
      <Map {...this.props} {...this.state} mapRef={this.mapRef} onCloseMapPlaceModal={this.onCloseMapPlaceModal} />
    );
  }
}

export default MapContainer;
