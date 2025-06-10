import { useState } from 'react';

export default function NavGroup({ children, isActive = false }) {
  const [open, setOpen] = useState(isActive);

  function handleClick() {
    setOpen(!open);
  }

  return children(handleClick, open);
}
