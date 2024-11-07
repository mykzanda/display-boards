import {
  createDirectus,
  staticToken,
  rest,
  verifyHash,
  readItems,
  createItem,
  updateItem,
  generateHash,
  readUsers,
  Identity,
} from "@directus/sdk";

import { IData } from "./types";

// interface MySchema {
//   Display_Board_Locations: DisplayBoardLocations[];
// }

//should be in env
const apiClient = createDirectus("https://data.zanda.info")
  .with(staticToken("YQRwVAFUn-LlC_IOPoOkpVLeH75QBlyI"))
  .with(rest());

const displayBoards: any = "Display_Boards";
const displayBoardLocations: any = "Display_Board_Locations";

// export async function getDisplayBoards(): Promise<
//   DisplayBoardLocations | undefined
// > {
//   return await apiClient?.request(
//     readItems(displayBoards, {
//       fields: ["*"],
//     })
//   );
// }

export async function getDisplayBoardLocations() {
  try {
    const response = await apiClient?.request(
      readItems(displayBoardLocations, {
        fields: [
          "id",
          "status",
          "Location_Name",
          "date_created",
          "user_created.first_name",
          "user_created.last_name",
          "user_created.avatar",
          "Display_Boards",
          "Display_Boards.id",
          "Display_Boards.status",
          "Display_Boards.Board_Name",
          "Display_Boards.Board_Items",
          "Display_Boards.Board_Items.Board_Items",
          "Display_Boards.Board_Items.Board_Items.Code",
          "Display_Boards.Board_Items.Board_Items.Parent_Product.Name",
          "Display_Boards.Board_Items.Board_Items.Item_Function.Function",
          "Display_Boards.Board_Items.Board_Items.Item_Finish.Finish_ID",
          "Display_Boards.Board_Items.Board_Items.Description",
        ],
      })
    );

    if (!response) {
      console.log(response);
    }

    return JSON.stringify(response);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

type GeneratedType = Awaited<ReturnType<typeof getDisplayBoardLocations>>;
type ResolvedType = Identity<GeneratedType>;

// console.log(ResolvedType);

// "status",
//         "Location_Name",
//         "date_created",
//         "user_created.first_name",
//         "user_created.last_name",
//         "user_created.avatar",
//         "Display_Boards.status",
//         "Display_Boards.Board_Name",
//         "Display_Boards.Board_Items",
//         "Display_Boards.Board_Items.Board_Items",
//         "Display_Boards.Board_Items.Board_Items.Code",
//         "Display_Boards.Board_Items.Board_Items.Item_Function.Function",
//         "Display_Boards.Board_Items.Board_Items.Item_Finish.Finish_ID",
//         "Display_Boards.Board_Items.Board_Items.Description",

// export async function getUsers() {
//   return await apiClient?.request(
//     readUsers({
//       fields: ["*"],
//     })
//   );
// }
