import * as React from 'react';
import Helmet from 'react-helmet';
import KakaoMap from '~/components/Map';
import i18n from '~/helpers/i18n';
import s from './Map.module.scss';
import { getPlaces } from '~/types/api';

interface IProps {
  t: (keyword: string) => string;
  loading: boolean;
  data: getPlaces | undefined;
  onChangeRegionComplete: (region: any) => void;
}

const Map: React.SFC<IProps> = props => {
  if (props.loading) {
    return null;
  }
  const { GetPlaces: { places = null } = {} } = props.data || {};
  if (!places) {
    return null;
  }
  return (
    <>
      <Helmet>
        <title>{props.t('map.title')} - Moodselah</title>
      </Helmet>
      <div className={s.container}>
        <KakaoMap
          className={s.map}
          initialOption={{ level: 5 }}
          data={places}
          readOnly={true}
          onChangeRegionComplete={props.onChangeRegionComplete}
        />
      </div>
    </>
  );
};

export default i18n(Map);
