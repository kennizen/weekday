import { IWithCat, IWithoutCat } from "../components/header/Filter";

export const Roles: IWithCat["options"] = {
  Engineering: [
    {
      id: "1",
      label: "Backend",
    },
    {
      id: "2",
      label: "Frontend",
    },
    {
      id: "3",
      label: "FullStack",
    },
    {
      id: "4",
      label: "IOS",
    },
    {
      id: "5",
      label: "Flutter",
    },
    {
      id: "6",
      label: "React Native",
    },
    {
      id: "7",
      label: "Android",
    },
    {
      id: "8",
      label: "Tech Lead",
    },
    {
      id: "9",
      label: "Dev-Ops",
    },
    {
      id: "10",
      label: "Data Engineer",
    },
    {
      id: "11",
      label: "Data Science",
    },
    {
      id: "12",
      label: "Computer-Vision",
    },
    {
      id: "13",
      label: "Nlp",
    },
    {
      id: "14",
      label: "Deep Learning",
    },
    {
      id: "15",
      label: "Test / Qa",
    },
    {
      id: "16",
      label: "Web3",
    },
    {
      id: "17",
      label: "Sre",
    },
    {
      id: "18",
      label: "Data-Infrastructure",
    },
  ],
  Design: [
    {
      id: "1",
      label: "Designer",
    },
    {
      id: "2",
      label: "Design Manager",
    },
    {
      id: "3",
      label: "Graphic Designer",
    },
    {
      id: "4",
      label: "Product Designer",
    },
  ],
  Product: [{ id: "1", label: "Product Manager" }],
  Operations: [
    {
      id: "1",
      label: "Operations Manager",
    },
    {
      id: "2",
      label: "Founder's Office/Chief Of Staff",
    },
  ],
  Sales: [
    {
      id: "1",
      label: "Sales Development Representative",
    },
    {
      id: "2",
      label: "Account Executive",
    },
    {
      id: "3",
      label: "Account Manager",
    },
  ],
  Marketing: [
    {
      id: "1",
      label: "Digital Marketing Manager",
    },
    {
      id: "2",
      label: "Growth Hacker",
    },
    {
      id: "3",
      label: "Marketing",
    },
    {
      id: "4",
      label: "Product Marketing Manager",
    },
  ],
  "Other Engineering": [
    {
      id: "1",
      label: "Hardware",
    },
    {
      id: "2",
      label: "Mechanical",
    },
    {
      id: "3",
      label: "Systems",
    },
  ],
  "Business Analyst": [{ id: "1", label: "Business Analyst" }],
  "Data Analyst": [{ id: "1", label: "Data Analyst" }],
  "Project Manager": [{ id: "1", label: "Project Manager" }],
  Management: [{ id: "1", label: "Management" }],
  Legal: [{ id: "1", label: "Legal" }],
  Hr: [{ id: "1", label: "Hr" }],
  Finance: [{ id: "1", label: "Finance" }],
};

export const NumOfEmp: IWithoutCat["options"] = [
  {
    id: "1",
    label: "1-10",
  },
  {
    id: "2",
    label: "11-20",
  },
  {
    id: "3",
    label: "21-50",
  },
  {
    id: "4",
    label: "51-100",
  },
  {
    id: "5",
    label: "101-200",
  },
  {
    id: "6",
    label: "201-500",
  },
  {
    id: "7",
    label: "500+",
  },
];

export const Exp: IWithoutCat["options"] = [
  {
    id: "1",
    label: "1",
  },
  {
    id: "2",
    label: "2",
  },
  {
    id: "3",
    label: "3",
  },
  {
    id: "4",
    label: "4",
  },
  {
    id: "5",
    label: "5",
  },
  {
    id: "6",
    label: "6",
  },
  {
    id: "7",
    label: "7",
  },
  {
    id: "8",
    label: "8",
  },
  {
    id: "9",
    label: "9",
  },
  {
    id: "10",
    label: "10",
  },
];

export const Remote: IWithoutCat["options"] = [
  {
    id: "1",
    label: "Remote",
  },
  {
    id: "2",
    label: "Hybrid",
  },
  {
    id: "3",
    label: "In-Office",
  },
];

export const MinBasePay: IWithoutCat["options"] = [
  {
    id: "1",
    label: "0L",
  },
  {
    id: "2",
    label: "10L",
  },
  {
    id: "3",
    label: "20L",
  },
  {
    id: "4",
    label: "30L",
  },
  {
    id: "5",
    label: "40L",
  },
  {
    id: "6",
    label: "50L",
  },
  {
    id: "7",
    label: "60L",
  },
  {
    id: "8",
    label: "70L",
  },
];
