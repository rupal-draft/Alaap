"use client";
import React, { useState, useEffect } from "react";
import MessageLayout from "@/components/Layouts/MessageLayout";

const DynamicPage = ({ params }) => {
  const { id } = params;
  return (
    <MessageLayout>
      <h1>Dynamic Page {id}</h1>
    </MessageLayout>
  );
};

export default DynamicPage;
