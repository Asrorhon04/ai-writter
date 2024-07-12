import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	en:{
		dashboard:{
			title:'Title',
			titleHint:'Please, provide a title for your content',
			description:'Description',
			descriptionPlaceholder:'Write about ReactJS form validation. Provide a real life examples',
			descriptionHint:'Please, provide a description for you content',
			generate:'Generate',
			profile:'Profile',
			logout:'LogOut',
		},
	},
	ru:{
		dashboard:{
			title:'Заголовок',
			titleHint:'Пожалуйста, укажите название вашего контента.',
			description:'Описание',
			descriptionPlaceholder:'Напишите о проверке формы ReactJS. Приведите практические примеры жизни',
			descriptionHint:'Пожалуйста, напишите описание вашего контента',
			generate:'Генерировать',
			profile:'Профиль',
			logout:'Выйти',
		},
	},
	uz:{
		dashboard:{
			title:'Sarlavha',
			titleHint:'Iltimos kontent uchun sarlavha kiriting',
			description:'Tavsifi',
			descriptionPlaceholder:'ReactJSda form validatsiyasi haqida yozing. Amaliy misollar taqdim eting',
			descriptionHint:'Iltimos, kontent ravsifini yozing',
			generate:'Yaratish',
			profile:'Sahifa',
			logout:'Chiqish',
		},
	}
};

i18n
	.use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
		fallbackLng:'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
		detection:{
			order:['localStorage'],
		},
  });

  export default i18n;