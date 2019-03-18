import loadImage from 'blueimp-load-image';
import EXIF from 'exif-js';

declare const daum: any;

export const toImageFile = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      reject('No File');
    }
    const fileType = file.type;
    loadImage(
      file,
      img => {
        if (img.type === 'error') {
          reject(img);
        }
        img.toBlob(blob => {
          const createdFile = new File([blob], file.name);
          resolve(createdFile);
        }, fileType);
      },
      {
        orientation: true,
        maxWidth: 1200
      }
    );
  });
};

export const toImageFiles = (fileList: FileList): Promise<File[]> => {
  return new Promise(async resolve => {
    const files: File[] = [];
    const toArrayFileList = Array.prototype.slice.call(fileList);
    for (const file of toArrayFileList) {
      try {
        const fixedFile = await toImageFile(file);
        files.push(fixedFile);
      } catch (e) {
        // nothing to do
      }
    }
    resolve(files);
  });
};

const convertDMSToDD = (degrees, minutes, seconds, direction) => {
  let dd = degrees + minutes / 60 + seconds / 3600;
  if (direction === 'S' || direction === 'W') {
    dd = dd * -1;
  }
  return dd;
};

export const getGPSLocation = (file: File): Promise<{ lat: number; lng: number; address: string }> => {
  return new Promise((resolve, reject) => {
    const res = EXIF.getData(file, function(this: any) {
      const exifData = this.exifdata;
      if (!exifData.GPSLatitude || !exifData.GPSLongitude) {
        return reject(new Error('사진에서 GPS 정보를 받아 올 수 없습니다.'));
      }
      // Calculate latitude decimal
      const latDegree = exifData.GPSLatitude[0].numerator;
      const latMinute = exifData.GPSLatitude[1].numerator;
      const latSecond = exifData.GPSLatitude[2].numerator;
      const latDirection = exifData.GPSLatitudeRef;
      const lat = convertDMSToDD(latDegree, latMinute, latSecond, latDirection);

      // Calculate longitude decimal
      const lngDegree = exifData.GPSLongitude[0].numerator;
      const lngMinute = exifData.GPSLongitude[1].numerator;
      const lngSecond = exifData.GPSLongitude[2].numerator;
      const lngDirection = exifData.GPSLongitudeRef;
      const lng = convertDMSToDD(lngDegree, lngMinute, lngSecond, lngDirection);

      const geocoder = new daum.maps.services.Geocoder();
      geocoder.coord2Address(lng, lat, (result, status) => {
        if (status === daum.maps.services.Status.OK) {
          const roadAddr = !!result[0].road_address ? result[0].road_address.address_name : '';
          const jibunAddr = result[0].address.address_name;
          return resolve({ lat, lng, address: roadAddr || jibunAddr });
        }
        return reject(new Error('사진의 장소가 대한민국이 아닙니다.'));
      });
    });
    if (!res) {
      return reject(new Error('이미지 파일이 아닙니다.'));
    }
  });
};
