import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import UserTable from "../../components/Users/UserTable";
import UserModal from "../../components/Users/UserModal";
import { User, Role } from "../../types/user";
import { userService } from "../../services/userService";
import Swal from "sweetalert2";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);

  // In a real app, you'd get this from an auth context
  const currentUserId = JSON.parse(localStorage.getItem("user") || "{}").id;

  useEffect(() => {
    loadInitialData();
  }, []);

  const getSwalConfig = (icon: "success" | "error" | "warning", title: string, text: string) => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    return {
      icon,
      title,
      text,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#EF4444",
      background: isDarkMode ? "#1f2937" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
      heightAuto: false,
      scrollbarPadding: false,
    } as any;
  };

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      const [usersRes, rolesRes] = await Promise.all([
        userService.getUsers(),
        userService.getRoles()
      ]);

      if (usersRes.success) setUsers(usersRes.data);
      if (rolesRes.success) setRoles(rolesRes.data);
    } catch (error: any) {
      Swal.fire(getSwalConfig("error", "Error", error.message || "Failed to load user management data"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModalForAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (user: User) => {
    setEditData(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (data: any) => {
    try {
      let response;
      if (editData) {
        response = await userService.updateUser(editData.id, data);
      } else {
        response = await userService.createUser(data);
      }

      if (response.success) {
        setIsModalOpen(false);
        await Swal.fire(getSwalConfig("success", "Success!", response.message || `User account ${editData ? "updated" : "created"} successfully`));
        loadInitialData();
      }
    } catch (error: any) {
      Swal.fire(getSwalConfig("error", "Save Error", error.message || "Failed to save user account"));
    }
  };

  const handleToggleStatus = async (id: number | string, is_active: number) => {
    try {
      const response = await userService.toggleUserStatus(id, is_active);
      if (response.success) {
        setUsers(users.map(u => u.id === id ? { ...u, is_active } : u));
        Swal.fire({
          ...getSwalConfig("success", "Status Updated", `Account is now ${is_active ? "active" : "inactive"}`),
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error: any) {
      Swal.fire(getSwalConfig("error", "Status Update Error", error.message || "Failed to toggle status"));
    }
  };

  const handleDeleteUser = async (id: number | string) => {
    if (id === currentUserId) {
      Swal.fire(getSwalConfig("error", "Action Prohibited", "You cannot delete your own account while logged in."));
      return;
    }

    const result = await Swal.fire({
      ...getSwalConfig("warning", "Are you sure?", "This user account will be permanently deactivated and removed."),
      showCancelButton: true,
      confirmButtonText: "Yes, delete account!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await userService.deleteUser(id);
        if (response.success) {
          await Swal.fire(getSwalConfig("success", "Deleted!", response.message || "User account removed successfully"));
          loadInitialData();
        }
      } catch (error: any) {
        Swal.fire(getSwalConfig("error", "Delete Error", error.message || "Failed to delete user account"));
      }
    }
  };

  return (
    <>
      <PageMeta title="User Management | Admin Dashboard" description="Manage system administrators and roles" />
      <PageBreadcrumb pageTitle="User Management" />

      <div className="space-y-6">
        <ComponentCard title="Active Administrators">
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg">
              Manage system access for administrators and superadmins. Oversee account status,
              identity verification, and granular role assignments.
            </p>
            <Button variant="primary" size="sm" onClick={handleOpenModalForAdd}>
              + Add Admin User
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600"></div>
            </div>
          ) : (
            <UserTable
              users={users}
              currentUserId={currentUserId}
              onEdit={handleOpenModalForEdit}
              onDelete={handleDeleteUser}
              onToggleStatus={handleToggleStatus}
            />
          )}
        </ComponentCard>
      </div>

      <UserModal
        key={editData?.id || "new"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        editData={editData}
        roles={roles}
      />
    </>
  );
}
