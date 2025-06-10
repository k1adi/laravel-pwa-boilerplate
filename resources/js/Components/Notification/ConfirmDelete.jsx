import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

export default async function ConfirmDelete(name='') {
  const MySwal = withReactContent(Swal);

  try {
    const result = await MySwal.fire({
      title: 'Delete Data?',
      html: `<p>Are you sure want to delete <b>${name}</b>?</p>
        <p>This action cannot be undone!</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
    });

    return result.isConfirmed; // Returns true if the user confirms
  } catch (error) {
    console.error('SweetAlert error:', error);
    return false; // Return false if there is an error
  }
}
