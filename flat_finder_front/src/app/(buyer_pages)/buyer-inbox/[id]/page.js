"use client"
import ChatInbox from '@/components/common/MessageInbox/MessageInbox'
import * as React from "react";

export default function Page({ params }) {
  const { id } = React.use(params);

  return <ChatInbox id={id} />;
}
