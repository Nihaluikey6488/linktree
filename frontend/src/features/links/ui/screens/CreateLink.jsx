import React from "react";
import { useForm } from "react-hook-form";
import useLinks from "../../hooks/useLinks";
import { useSelector } from "react-redux";

const CreateLink = () => {
  const { createLink } = useLinks();
  const { user } = useSelector((s) => s.auth);
  const username = user?.user?.username || user?.username;
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      // basic URL validation
      try {
        new URL(data.url);
      } catch (e) {
        return alert("Please enter a valid URL");
      }

      await createLink(data);
      alert("Link created");
    } catch (err) {
      console.error(err);
      alert("Error creating link");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create Link</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Title</label>
            <input {...register("title", { required: true })} className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-200" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Destination URL</label>
            <input {...register("url", { required: true })} className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-200" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Description (optional)</label>
            <input {...register("description")} className="w-full border border-gray-200 px-4 py-3 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Custom Slug (optional)</label>
            <input {...register("slug")} className="w-full border border-gray-200 px-4 py-3 rounded-lg" />
          </div>

          <div className="flex items-center gap-3">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">Create</button>
            <div className="text-sm text-gray-500">Your link will appear on your public profile immediately.</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLink;
