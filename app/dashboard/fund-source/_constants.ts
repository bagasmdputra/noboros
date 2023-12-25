export type Bank = {
  name: string;
  code: string;
  imagePath: string;
};

const bankList: Bank[] = [
  {
    name: "Bank Mandiri",
    code: "008",
    imagePath: "/banks/008.png",
  },
  {
    name: "Bank Central Asia",
    code: "014",
    imagePath: "/banks/014.png",
  },
  {
    name: "Bank OCBC NISP",
    code: "028",
    imagePath: "/banks/028.png",
  },
];

const emptyBank: Bank = {
  name: "",
  code: "",
  imagePath: "",
};

export const getBankByCode = (code: string): Bank => {
  return bankList.find((bank) => bank.code === code) ?? emptyBank;
};

export default bankList;
