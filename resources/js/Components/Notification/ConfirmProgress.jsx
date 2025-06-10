import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

export default async function ConfirmProgress({ name, status }) {
  const MySwal = withReactContent(Swal);

  try {
    const result = await MySwal.fire({
      title: 'Update Status?',
      html: `Decide whether this <b>${name}</b> is a won, lost or a progress!`,
      icon: 'question',
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Won',
      denyButtonText: 'Lost',
      cancelButtonText: 'Progress',
      confirmButtonColor: '#059669',
      denyButtonColor: '#9f1239',
      cancelButtonColor: '#64748b',
    });

    if (result.isConfirmed && status != 'won') {
      return 'won'; // Return "won" if confirmed
    }

    if (result.isDenied && status != 'lost') {
      return 'lost'; // Return "loss" if denied
    } 
    
    if (result.dismiss === Swal.DismissReason.cancel && status != 'progress') {
      return 'progress'; // Return "progress" if canceled
    }

    return null; // Return null as a default
  } catch (error) {
    console.error('SweetAlert error:', error);
    return false; // Return false if there is an error
  }
}
