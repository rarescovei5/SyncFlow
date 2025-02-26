import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import {
  deleteWorkspace,
  newWorkspace,
  saveWorkspaces,
} from '../../app/slices/workspacesSlice';
import AddIcon from '../../components/icons/AddIcon';
import ListIcon from '../../components/icons/List';
import CloseIcon from '../../components/icons/Close';

const Sidebar = (props: {
  selectedMenu: number;
  setSelectedMenu: Function;
}) => {
  const workspaces = useSelector((state: RootState) => state.workspaces);
  const dispatch = useDispatch();

  const createNewWorkspace = () => {
    dispatch(newWorkspace());
    dispatch(saveWorkspaces());
  };
  const handleSelectMenu = (index: number) => {
    props.setSelectedMenu(index);
  };
  const handleDeleteMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    handleSelectMenu(-1);
    dispatch(deleteWorkspace(props.selectedMenu));
    dispatch(saveWorkspaces());
  };
  return (
    <div className="p-4 glass-card w-xs h-full text-white flex flex-col gap-4 select-none">
      <button
        className={`flex items-center gap-4 p-4 border-[1px] border-transparent rounded-2xl ${
          props.selectedMenu === -1
            ? 'bg-slate-800/50 border-white/10'
            : 'cursor-pointer hover:bg-slate-800/50'
        }`}
        onClick={() => handleSelectMenu(-1)}
      >
        <ListIcon classes="w-4 min-w-4" />
        <p>Templates</p>
      </button>
      <hr className="h-[1px] w-full bg-white opacity-50 rounded-2xl" />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between px-4">
          <small className="text-secondary">Workspaces</small>
          <button
            className="cursor-pointer hover:scale-125 transition-all"
            onClick={createNewWorkspace}
          >
            <AddIcon classes="w-2 min-w-2" />
          </button>
        </div>
        {workspaces.map((workspace, index) => (
          <div
            className={`p-4  relative rounded-2xl flex gap-2 border-[1px] border-transparent items-center ${
              props.selectedMenu === index
                ? 'bg-slate-800/50 border-white/10'
                : 'hover:bg-slate-800/50 cursor-pointer'
            }`}
            key={index}
            onClick={() => handleSelectMenu(index)}
          >
            <div className="bg-accent w-4 h-4 rounded-2xl grid place-content-center">
              <small className="letter text-slate-950">
                {workspace.name.charAt(0)}
              </small>
            </div>
            <p>{workspace.name}</p>
            <button
              className={`absolute right-4 top-1/2 -translate-y-[50%] ${
                props.selectedMenu === index ? 'cursor-pointer' : 'hidden'
              }`}
              onClick={(e) => handleDeleteMenu(e)}
            >
              <CloseIcon classes="min-w-2 w-2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
