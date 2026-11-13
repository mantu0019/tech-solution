 import { useAdmin } from '../hooks/useAdmin'
import Loading from '../../../components/Loading';

const AdminServicesAllData = () => {

 const {error,isLoading,adminServices}  =useAdmin();
return (
    <div>AdminServicesAllData</div>
  )
}

export default AdminServicesAllData