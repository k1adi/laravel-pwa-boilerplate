import ExpandableSection from '@/Components/ExpandableSection';
import FieldGroup from '@/Components/Form/FieldGroup';
import Select from 'react-select';
import ConfirmDelete from '@/Components/Notification/confirmDelete';
import ActionButton from '@/Components/Button/ActionButton';
import CancelButton from '@/Components/Button/CancelButton';
import LoadingButton from '@/Components/Button/LoadingButton';
import { Plus, Trash2 } from 'lucide-react';

export default function BuRoleField({ data, setData, errors, processing, selectOption, page='User' }){
  const {bus, roles} = selectOption;
  // Get a list of already selected BU IDs
  const selectedBuIds = data.pivots.map(pivot => pivot.bu_id).filter(id => id !== '');

  // Function to filter available BUs dynamically
  const getFilteredBusOptions = (pivotIndex) => {
    return bus.filter(bu => 
      !selectedBuIds.includes(bu.value) || (data.pivots[pivotIndex]?.bu_id === bu.value)
    );
  };

  // Reusable function to update `pivots`
  const updatePivot = (updateFn) => {
    const pivots = updateFn([...data.pivots]);
    setData('pivots', pivots);
  };

  const handleAddPivot = () => {
    updatePivot((pivots) => [...pivots, {
      bu_id: '',
      buSelected: '',
      role_id: '',
      roleSelected: '',
    }]);
  }

  const handleRemovePivot = async (pivotIndex) => {
    const confirmed = await ConfirmDelete();
    if (confirmed) {
      updatePivot((pivots) => pivots.filter((_, i) => i !== pivotIndex));
    }
  }

  const handleBuChange = (option, pivotIndex) => {
    updatePivot((pivots) => {
      pivots[pivotIndex].bu_id = option.value;
      pivots[pivotIndex].buSelected = option;

      return pivots;
    });
  }

  const handleRoleChange = (option, pivotIndex) => {
    const roleIds = option.map(item => item.value);
    updatePivot((pivots) => {
      pivots[pivotIndex].role_id = roleIds;
      pivots[pivotIndex].roleSelected = option;

      return pivots;
    });
  }

  return (
    <ExpandableSection title='Bu & Roles' >
      <div className='flex justify-end'>
        {page === 'User' && (
          <ActionButton
            isDisabled={processing}
            onClick={handleAddPivot}
          >
            <Plus strokeWidth={3} size={16} className='inline-block mb-1'/> Add Role
          </ActionButton>
        )}
      </div>

      {data.pivots.map((pivot, pivotIndex) => (
        <div key={pivotIndex} className='flex flex-row items-start my-2'>
          {page === 'User' && (
            <button 
              type='button'
              className={`btn btn--sm btn--danger py-3 inline-block max-w-fit flex-none me-2 ${(processing || data.pivots.length == 1) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              disabled={processing || data.pivots.length == 1}
              onClick={() => handleRemovePivot(pivotIndex)}
            >
              <Trash2 strokeWidth={3} size={18} className='mb-1 inline-block'/> Delete
            </button>
          )}

          <FieldGroup error={errors[`pivots.${pivotIndex}.bu_id`]}>
            <Select
              options={getFilteredBusOptions(pivotIndex)}
              value={pivot.buSelected}
              className='mt-1 block w-80 me-2'
              menuPortalTarget={document.body}
              menuPosition='fixed'
              placeholder={'Select Business Unit...'}
              onChange={(option) => handleBuChange(option, pivotIndex)}
              required={true}
              isDisabled={page === 'Profile'}
            />
          </FieldGroup>

          <FieldGroup className='block w-full' error={errors[`pivots.${pivotIndex}.role_id`]}>
            <Select
              isMulti
              options={roles}
              value={pivot.roleSelected}
              className='mt-1 w-full'
              menuPortalTarget={document.body}
              menuPosition='fixed'
              placeholder={'Select Roles...'}
              onChange={(option) => handleRoleChange(option, pivotIndex)}
              required={true}
              isDisabled={page === 'Profile'}
            />
          </FieldGroup>
        </div>
      ))}

      <div className='flex justify-end mt-2'>
        {!processing && 
          <CancelButton routeName={page === 'User' ? 'users.index' : 'dashboard'} />
        }
        <LoadingButton disabled={processing}>
          Submit
        </LoadingButton>
      </div>
    </ExpandableSection>
  );
}