import * as React from 'react';
import { Query } from 'react-apollo';
import autobind from 'autobind-decorator';
import { getPlaces } from '~/types/api';
import { GET_PLACES } from './queries';
import Map from './Map';

type latLng = {
  lat: number;
  lng: number;
};

export interface IProps {}

export interface IState {
  isInfiniteScroll: boolean;
  isFinishedLoadMore: boolean;
  lat?: number;
  lng?: number;
}

class GetPlacesQuery extends Query<getPlaces> {}

class MapContainer extends React.Component<IProps, IState> {
  $mounted: boolean = false;
  fetchMore: any;
  state: IState = {
    isInfiniteScroll: false,
    isFinishedLoadMore: false,
    lat: undefined,
    lng: undefined
  };

  async componentDidMount() {
    this.$mounted = true;
    let center: latLng | undefined;
    try {
      center = await this.getCurrentLocation();
    } catch (e) {
      // nothing to do
    }
    const { lat, lng } = center || { lat: 37.566826, lng: 126.9786567 }; // default: 서울시청
    this.setStateIfMounted({ lat, lng });
  }

  componentWillUnmount() {
    this.$mounted = false;
  }

  setStateIfMounted(state, callback = undefined) {
    if (this.$mounted) {
      this.setState(state, callback);
    }
  }

  @autobind
  private onLoadMore(lat: number, lng: number) {
    if (!this.$mounted) return;
    if (!this.fetchMore) return;
    this.fetchMore({
      variables: {
        lat,
        lng
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      }
    });
  }

  @autobind
  private onChangeRegionComplete(region) {
    const { lat, lng } = region.center;
    this.onLoadMore(lat, lng);
  }

  @autobind
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

  public render() {
    const { lat, lng } = this.state;
    if (!lat || !lng) {
      return null;
    }
    return (
      <GetPlacesQuery query={GET_PLACES} variables={{ lat, lng }}>
        {({ data, fetchMore, loading }) => {
          this.fetchMore = fetchMore;
          return (
            <Map
              {...this.state}
              {...this.props}
              loading={loading}
              data={data}
              onChangeRegionComplete={this.onChangeRegionComplete}
            />
          );
        }}
      </GetPlacesQuery>
    );
  }
}

export default MapContainer;
