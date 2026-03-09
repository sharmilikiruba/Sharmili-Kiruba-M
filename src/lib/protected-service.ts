import apiClient from './api-client';

export interface ProtectedResponse {
  success: boolean;
  message: string;
  user?: any;
}

export const protectedService = {
  /**
   * Access profile details (Any authenticated user)
   */
  async getProfile(): Promise<ProtectedResponse> {
    const response = await apiClient.get('/protected/profile');
    return response.data;
  },

  /**
   * Test admin access
   */
  async checkAdminAccess(): Promise<ProtectedResponse> {
    const response = await apiClient.get('/protected/admin-only');
    return response.data;
  },

  /**
   * Test warden and admin access
   */
  async checkWardenAccess(): Promise<ProtectedResponse> {
    const response = await apiClient.get('/protected/warden-area');
    return response.data;
  },

  /**
   * Test guard and admin access
   */
  async checkGuardAccess(): Promise<ProtectedResponse> {
    const response = await apiClient.get('/protected/guard-area');
    return response.data;
  },

  /**
   * Test student access
   */
  async checkStudentAccess(): Promise<ProtectedResponse> {
    const response = await apiClient.get('/protected/student-only');
    return response.data;
  },
};

export default protectedService;
