import { TableLoader } from "./loaders";
import { TaskmannLogo } from "./logo";

export const DisableInteractionsLoader = () => {
  return (
    <div className="interactionLoader">
      <TaskmannLogo />
      <TableLoader />
    </div>
  );
};
