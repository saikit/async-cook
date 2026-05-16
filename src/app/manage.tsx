import ManageEquipment from '@/components/manage/ManageEquipment';
import ManageCategory from '@/components/manage/ManageCategory';
import ManageRecipes from '@/components/manage/ManageRecipes';

function ManageDashboard() {
  return (
    <>
      <title>The Async Cook - Manage recipes</title>
      <div className="p-4">
        <h1 className="text-2xl mb-4">Manage Recipes</h1>
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
    </>
  );
}

export default ManageDashboard;
