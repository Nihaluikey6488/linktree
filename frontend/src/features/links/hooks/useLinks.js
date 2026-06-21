import { useState } from "react";
import axiosInstance from "../../../config/axiosInstance";

export const useLinks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLinksByUsername = async (username) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`/api/links/${username}`);
      setLoading(false);
      return res.data.data.links;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const createLink = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post(`/api/links`, payload);
      setLoading(false);
      return res.data.data.newLink;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const updateLink = async (linkId, payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.patch(`/api/links/${linkId}`, payload);
      setLoading(false);
      return res.data.data.updatedLink || res.data.data.link;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const deleteLink = async (linkId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.delete(`/api/links/${linkId}`);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const incrementClick = async (linkId) => {
    try {
      const res = await axiosInstance.patch(`/api/links/${linkId}/click`);
      return res.data.data.link;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    getLinksByUsername,
    createLink,
    incrementClick,
    loading,
    error,
  };
};

export default useLinks;
