import ManageEquipment from '@/components/manage/ManageEquipment';
import ManageCategory from '@/components/manage/ManageCategory';
import ManageRecipes from '@/components/manage/ManageRecipes';
import ManageMedia from '@/components/manage/ManageMedia';
import UploadMedia from '@/components/manage/UploadMedia';
import ManageIcons from '@/components/manage/ManageIcons';

function ManageDashboard() {
  return (
    <>
      <title>The Async Cook - Manage recipes</title>
      <div className="p-4">
        <h1 className="text-3xl mb-4 text-center">Manage Recipes</h1>
        <ManageRecipes />
      </div>
      <div className="p-4">
        <h1 className="text-2xl mb-4">Equipment</h1>
        <ManageEquipment />
      </div>
      <div className="p-4">
        <h1 className="text-2xl mb-4">Categories</h1>
        <ManageCategory />
      </div>
      {/* <div className="p-4">
        <h1 className="text-2xl mb-4">Icons</h1>
        <ManageIcons />
      </div> */}
      <div className="p-4">
        <h1 className="text-2xl mb-4">Media</h1>
        <h2 className="text-xl mb-4">Update</h2>
        <ManageMedia />
        <h2 className="text-xl mb-4">Upload</h2>
        <UploadMedia />
      </div>
    </>
  );
}

export default ManageDashboard;
