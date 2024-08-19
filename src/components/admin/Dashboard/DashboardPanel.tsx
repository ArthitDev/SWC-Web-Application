import React from 'react';
import withAuth from 'utils/withAuth';

type DashboardPanelProps = {};

const DashboardPanel: React.FC<DashboardPanelProps> = () => {
  return <div>DashboardPanel</div>;
};

export default withAuth(DashboardPanel);
