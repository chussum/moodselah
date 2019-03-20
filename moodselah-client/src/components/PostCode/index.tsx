import React from 'react';
import autobind from 'autobind-decorator';
import PostCode from './PostCode';

declare const daum: any;

export interface IProps {
  containerClassName?: any;
  onComplete: (data) => void;
  alwaysShowEngAddr: boolean;
  animation: boolean;
  autoClose: boolean;
  autoMapping: boolean;
  autoResize: boolean;
  defaultQuery: string;
  errorMessage: string | React.ReactElement;
  hideEngBtn: boolean;
  hideMapBtn: boolean;
  maxSuggestItems: number;
  pleaseReadGuide: number;
  pleaseReadGuideTimer: number;
  scriptUrl: string;
  shorthand: boolean;
  showMoreHName: boolean;
  style: any;
  submitMode: boolean;
  theme: any;
  useSuggest: boolean;
  zonecodeOnly: boolean;
  width: string | number;
  height: string | number;
}

export interface IState {
  width: string | number;
  height: string | number;
  display: string;
  error: boolean;
}

const defaultErrorMessage = <p>현재 Daum 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>;

class PostCodeContainer extends React.Component<IProps, IState> {
  static defaultProps = {
    alwaysShowEngAddr: false,
    animation: false,
    autoClose: false,
    autoMapping: true,
    autoResize: false,
    defaultQuery: null,
    errorMessage: defaultErrorMessage,
    height: 400,
    hideEngBtn: false,
    hideMapBtn: false,
    maxSuggestItems: 10,
    pleaseReadGuide: 0,
    pleaseReadGuideTimer: 1.5,
    scriptUrl: 'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false',
    shorthand: true,
    showMoreHName: false,
    style: null,
    submitMode: true,
    theme: null,
    useSuggest: true,
    width: '100%',
    zonecodeOnly: false
  };

  private $mounted: boolean = false;
  private daumPostCodeRef: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: IProps) {
    super(props);
    this.state = {
      display: 'block',
      width: props.width,
      height: props.height,
      error: false
    };
  }

  public componentDidMount() {
    this.$mounted = true;

    const scriptId = 'kakao_postcode';
    const isExist = !!document.getElementById(scriptId);

    if (!isExist) {
      const script = document.createElement('script');
      script.src = this.props.scriptUrl;
      script.onload = () => this.onInit(this);
      script.onerror = error => this.handleError(error);
      script.id = scriptId;
      document.body.appendChild(script);
    } else {
      this.onInit(this);
    }
  }

  public componentWillUnmount() {
    this.$mounted = false;
  }

  setStateIfMounted(state, callback = undefined) {
    if (this.$mounted) {
      this.setState(state, callback);
    }
  }

  @autobind
  private onInit(comp) {
    daum.postcode.load(() => {
      const Postcode = new daum.Postcode({
        oncomplete: function oncomplete(data) {
          comp.props.onComplete(data);
          if (comp.props.autoClose) {
            comp.setStateIfMounted({ display: 'none' });
          }
        },
        onresize: function onresize(size) {
          if (comp.props.autoResize) {
            comp.setStateIfMounted({ height: size.height });
          }
        },
        alwaysShowEngAddr: comp.props.alwaysShowEngAddr,
        animation: comp.props.animation,
        autoMapping: comp.props.autoMapping,
        autoResize: comp.props.autoResize,
        height: comp.props.height,
        hideEngBtn: comp.props.hideEngBtn,
        hideMapBtn: comp.props.hideMapBtn,
        maxSuggestItems: comp.props.maxSuggestItems,
        pleaseReadGuide: comp.props.pleaseReadGuide,
        pleaseReadGuideTimer: comp.props.pleaseReadGuideTimer,
        shorthand: comp.props.shorthand,
        showMoreHName: comp.props.showMoreHName,
        submitMode: comp.props.submitMode,
        theme: comp.props.theme,
        useSuggest: comp.props.useSuggest,
        width: comp.props.width,
        zonecodeOnly: comp.props.zonecodeOnly
      });
      Postcode.embed(this.daumPostCodeRef.current, { q: this.props.defaultQuery, autoClose: this.props.autoClose });
    });
  }

  @autobind
  private handleError(error) {
    error.target.remove();
    this.setStateIfMounted({ error: true });
  }

  render() {
    return <PostCode {...this.props} {...this.state} daumPostCodeRef={this.daumPostCodeRef} />;
  }
}

export default PostCodeContainer;
