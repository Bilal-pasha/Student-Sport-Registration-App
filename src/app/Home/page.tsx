"use client"
import CheckAuthentication from '@/components/CheckAuth/CheckAuth';
import HomeScreen from '@/components/HomeScreen/HomeScreen';
import React from 'react';

const Page: React.FC = () => {
  return <HomeScreen />;
};

export default CheckAuthentication(Page);
