import { Params, createHashRouter } from "react-router-dom";
import SettingPage from "../settings/Settings";
import App from "../App";
import GroupPage from "../group/GroupPage";
import Flashcard from "../components/Flashcard";
import { Group } from "../group/group";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/settings",
    element: <SettingPage />,
  },
  {
    path: "group/:name",
    loader: async ({ params }: { params: Params<"name"> }) => {
      if (!params.name) {
        return {
          name: "unkown",
          sentences: [],
        };
      }

      const group = new Group({ name: params.name });

      return {
        name: params.name,
        sentences: group.getSentences({}),
      };
    },
    element: <GroupPage />,
  },
  {
    path: "flashcard/:name",
    loader: async ({ params }: { params: Params<"name"> }) => {
      if (!params.name) {
        return {
          name: "unkown",
          sentences: [],
        };
      }

      const group = new Group({ name: params.name });
      const sentences = group.getSentences({});

      // Get 40 items only
      // const MAX_ITEMS = 40;
      // if (sentences.length - MAX_ITEMS > 0) {
      //   sentences.sort(sortByState);
      //   sentences = sentences.splice(0, MAX_ITEMS);
      // }

      return {
        name: params.name,
        sentences: sentences,
      };
    },
    element: <Flashcard />,
  },
]);

export default router;
