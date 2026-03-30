import { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import RichTextEditor from "../../components/form/input/RichTextEditor";
import PortfolioMapModal, {
  PortfolioMapData,
} from "../../components/Portfolio/PortfolioMapModal";
import PortfolioMapTable from "../../components/Portfolio/PortfolioMapTable";
import Button from "../../components/ui/button/Button";

export default function Portfolio() {
  const [mapDataList, setMapDataList] = useState<PortfolioMapData[]>([
    {
      id: 1,
      title: "Headquarters",
      latitude: "40.7128",
      longitude: "-74.0060",
      content: "<p>Main technical division operations</p>",
    },
  ]);

  const [isEditingContent, setIsEditingContent] = useState(false);
  const [portfolioContent, setPortfolioContent] = useState(
    "Explore our global offices and significant technical portfolio locations mapped out below.",
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<PortfolioMapData | null>(null);

  const handleOpenModalForAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (data: PortfolioMapData) => {
    setEditData(data);
    setIsModalOpen(true);
  };

  const handleSaveMapData = (savedData: PortfolioMapData) => {
    if (savedData.id) {
      setMapDataList(
        mapDataList.map((item) =>
          item.id === savedData.id ? savedData : item,
        ),
      );
    } else {
      setMapDataList([...mapDataList, { ...savedData, id: Date.now() }]);
    }
  };

  const handleDeleteMapData = (id: number | string) => {
    if (window.confirm("Are you sure you want to delete this map data?")) {
      setMapDataList(mapDataList.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <PageMeta
        title="Portfolio Setup | Admin Dashboard"
        description="Manage portfolio map entries"
      />
      <PageBreadcrumb pageTitle="Portfolio Setup" />

      <div className="space-y-6">
        <ComponentCard
          title="Portfolio Section Content"
          action={
            isEditingContent ? (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditingContent(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setIsEditingContent(false)}
                >
                  Save
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setIsEditingContent(true)}
              >
                Edit Portfolio Content
              </Button>
            )
          }
        >
          <div className="space-y-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Main Portfolio Description
              </label>
              <div className="bg-white dark:bg-gray-900 rounded-lg">
                <RichTextEditor
                  value={portfolioContent}
                  onChange={setPortfolioContent}
                  disabled={!isEditingContent}
                  placeholder="Write your portfolio section overview content here..."
                />
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Portfolio Map Data">
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg">
              Manage the interactive map markers shown in the Portfolio section.
              Provide precise coordinates alongside rich contextual information
              for visitors.
            </p>
            <Button variant="primary" onClick={handleOpenModalForAdd}>
              + Add Map Data
            </Button>
          </div>

          <PortfolioMapTable
            mapData={mapDataList}
            onEdit={handleOpenModalForEdit}
            onDelete={handleDeleteMapData}
          />
        </ComponentCard>
      </div>

      <PortfolioMapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMapData}
        editData={editData}
      />
    </>
  );
}
