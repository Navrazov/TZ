import { IUser } from '../../types';
import { Drawer } from 'antd';

interface SidebarProps {
    selectedUser: IUser | null;
    onClose: () => void;
  }

const Sidebar: React.FC<SidebarProps> = ({ selectedUser, onClose }) => {
  return (
    <Drawer
    title="User Information"
    placement="left"
    closable={true}
    onClose={onClose}
    open={!!selectedUser}
  >
    {selectedUser && (
      <>
        <p>Name: {selectedUser.name}</p>
        <p>email: {selectedUser.email}</p>
        <p>balance: {selectedUser.balance}</p>
        <p>isActive: {String(selectedUser.isActive)}</p>
      </>
    )}
  </Drawer>
  )
}

export default Sidebar
