export interface DisplayBoardLocations {
  data: Datum[];
}

export interface Datum {
  id: number;
  status: string;
  user_created: string;
  date_created: Date;
  user_updated: string;
  date_updated: Date;
  Location_Name: string;
  Display_Boards: string[];
}

export interface IData {
  id: number;
  status: string;
  Location_Name: string;
  date_created: Date;
  user_created: UserCreated;
  Display_Boards: DisplayBoard[];
}

export interface DisplayBoard {
  id: string;
  status: string;
  Board_Name: string;
  Board_Items: BoardItem[];
}

export interface BoardItem {
  Board_Items: BoardItems;
}

export interface BoardItems {
  Code: string;
  Description: string;
  Item_Function: ItemFunction | null;
  Item_Finish: ItemFinish | null;
  Parent_Product: ItemParentProduct | null;
}

export interface ItemFinish {
  Finish_ID: string;
}
export interface ItemParentProduct {
  Name: string;
}

export interface ItemFunction {
  Function: string;
}

export interface UserCreated {
  first_name: string;
  last_name: string;
  avatar: string;
}
