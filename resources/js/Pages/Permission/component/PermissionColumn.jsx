import { usePage, Link } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import ButtonDelete from "@/Components/Button/ButtonDelete";

export default function PermissionColumn() {
  const { permissions } = usePage().props.auth;
  const permissionEdit = permissions.includes('permission_edit');
  const permissionDelete = permissions.includes('permission_delete');

  const columns = [
    {
      key: 'id',
      label: 'No.',
      classHead: 'table--number',
      classBody: 'text-center',
      render: (_, index) => index + 1,
    },
    {
      key: 'name',
      label: 'Name',
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
          <Link href={route('permissions.edit', item.id)} className='text-warning'>
            <Pencil className='inline-block mb-1' size={14} /> Edit
          </Link>
        }
        {(permissionDelete && item.canDelete) &&
          <ButtonDelete id={item.id} name={item.name} routeName='permissions.destroy' />
        }
      </>
    ),
  };

  if (permissionEdit || permissionDelete) {
    columns.push(action);
  }

  return columns;
}