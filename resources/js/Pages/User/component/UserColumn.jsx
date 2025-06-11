import { usePage, Link } from "@inertiajs/react";
import ButtonDelete from "@/Components/Button/ButtonDelete";
import { Pencil } from "lucide-react";

export default function UserColumn() {
  const { permissions } = usePage().props.auth;
  const permissionEdit = permissions.includes('user_edit');
  const permissionDelete = permissions.includes('user_delete');

  const columns = [
    {
      key: 'id',
      label: 'No.',
      classHead: 'table--number',
      classBody: 'text-center',
      render: (_, index) => index + 1,
    },
    {
      key: 'username',
      label: 'Username',
    },
    {
      key: 'fullname',
      label: 'Full Name',
    },
    {
      key: 'pivot',
      label: 'Business Unit',
      classBody: 'break-word',
      render: item => item.pivot.bus.map(list => (
        <span className={`label label--secondary group-hover:bg-light-primary dark:group-hover:bg-dark-primary group-hover:text-white`} key={list}> {list} </span>
      ))
    },
    {
      key: 'pivot',
      label: 'Role',
      classBody: 'break-word',
      render: item => item.pivot.roles.map(list => (
        <span className={`label label--secondary group-hover:bg-light-primary dark:group-hover:bg-dark-primary group-hover:text-white`} key={list}> {list} </span>
      ))
    },
    {
      key: 'phone',
      label: 'Phone',
    },
    {
      key: 'email',
      label: 'Email',
    },
  ];

  const action = {
    key: 'actions',
    label: 'Action',
    classHead: 'table--action',
    classBody: 'table--action',
    render: item => (
      <>
        {permissionEdit &&
          <Link href={route('users.edit', item.id)} className='text-warning'>
            <Pencil className='inline-block mb-1' size={14} /> Edit
          </Link>
        }
        {(permissionDelete && item.canDelete) &&
          <ButtonDelete id={item.id} name={item.fullname} routeName='users.destroy' />
        }
      </>
    ),
  };

  if (permissionEdit || permissionDelete) {
    columns.push(action);
  }

  return columns;
}
