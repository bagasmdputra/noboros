import { IconDefinition, IconName } from "@fortawesome/fontawesome-svg-core";
import {
  faBookOpen,
  faCarSide,
  faCartShopping,
  faCircle,
  faFilm,
  faHouse,
  faLaptop,
  faScrewdriverWrench,
  faSeedling,
  faShirt,
  faTicket,
  faUmbrellaBeach,
  faUtensils,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

export type PocketIconType = { name: IconName; element: IconDefinition };

export const Category = [
  "Groceries",
  "Needs",
  "Entertainment",
  "Personal Development",
  "Internet",
  "Subscription",
  "Transportation",
  "Annual Spending",
  "charity",
  "rent house/cicilan rumah",
  "Utilities",
];

export const pocketIconList: PocketIconType[] = [
  { name: "cart-shopping", element: faCartShopping },
  { name: "shirt", element: faShirt },
  { name: "ticket", element: faTicket },
  { name: "utensils", element: faUtensils },
  { name: "laptop", element: faLaptop },
  { name: "book-open", element: faBookOpen },
  { name: "wifi", element: faWifi },
  { name: "film", element: faFilm },
  { name: "car-side", element: faCarSide },
  { name: "umbrella-beach", element: faUmbrellaBeach },
  { name: "seedling", element: faSeedling },
  { name: "house", element: faHouse },
  { name: "screwdriver-wrench", element: faScrewdriverWrench },
];

export const getElement = (iconName: string) =>
  pocketIconList.find((i) => i.name == iconName)?.element ?? faCircle;
