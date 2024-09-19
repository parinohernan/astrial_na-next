"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface DataItem {
  Codigo: string;
  Descripcion: string;
}

interface DataListProps {
  type: "vendors" | "suppliers" | "customers" | "items" | "headings";
  title: string;
}

export function DataList({ type, title }: DataListProps) {
  const { data, isLoading, isError } = useQuery<DataItem[]>({
    queryKey: [type],
    queryFn: async () => {
      const response = await axios.get(`/api/data?type=${type}`);
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ul className="bg-white shadow overflow-hidden sm:rounded-md">
        {data?.map((item) => (
          <li key={item.Codigo} className="border-b border-gray-200">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {item.Descripcion}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {item.Codigo}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
