import { weekDays } from '../constants/Enum';
import { ImageResizeConf } from '../constants/Image';
import * as ImageManipulator from 'expo-image-manipulator';

export const isOpen = (schedule = {}) => {
  const currentDate = new Date();
  const day = weekDays[currentDate.getDay()];
  if (schedule[day]) {
    const openDate = new Date(schedule.openAt);
    const closeDate = new Date(schedule.closeAt);
    const dateDiff = closeDate.getDay() - openDate.getDate();
    const openHour = new Date();
    const closeHour = new Date()
    openHour.setHours(openDate.getHours(), openDate.getMinutes(), 0);
    dateDiff == 1 ? closeHour.setHours(closeDate.getHours() + 24, closeDate.getMinutes(), 0) : closeHour.setHours(closeDate.getHours(), closeDate.getMinutes(), 0);
    if (currentDate >= openHour && currentDate < closeHour) {
      return true;
    }
  }
  return false;
}

export const scheduleMessage = (schedule = {}) => {
  const currentDate = new Date();
  const day = weekDays[currentDate.getDay()];
  if (schedule[day]) {
    const openDate = new Date(schedule.openAt);
    const closeDate = new Date(schedule.closeAt);
    const dateDiff = closeDate.getDay() - openDate.getDate();
    const openHour = new Date();
    const closeHour = new Date();
    openHour.setHours(openDate.getHours(), openDate.getMinutes(), 0);
    dateDiff == 1 ? closeHour.setHours(closeDate.getHours() + 24, closeDate.getMinutes(), 0) : closeHour.setHours(closeDate.getHours(), closeDate.getMinutes(), 0);
    if (currentDate >= openHour && currentDate < closeHour) {
      return null;
    } else {
      if (currentDate <= openHour) {
        const minutes = openHour.getMinutes < 10 ? ('0' + openHour.getMinutes()) : openHour.getMinutes();
        return `Abre a las ${openHour.getHours()}:${minutes}`;
      }
    }
  }
  return `Cerrado por hoy`;
}

export const resizeImage = async (image) => {
  try {
    const imageResized = await ImageManipulator.manipulateAsync(
      image, [{ resize: { width: ImageResizeConf.width } }],
      { compress: ImageResizeConf.compress, format: ImageManipulator.SaveFormat.JPEG },
    );
    console.log('Image resized', imageResized);
    return imageResized.uri;
  } catch (err) {
    console.log('Error at resize the image', err);
  }
}
