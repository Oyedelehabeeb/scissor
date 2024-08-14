import QRCode from "qrcode.react";
import React from "react";

interface QrCodeProps {
  url: string;
}

const QrCode: React.FC<QrCodeProps> = ({ url }) => {
  return <QRCode value={url} size={128} />;
};

export default QrCode;
