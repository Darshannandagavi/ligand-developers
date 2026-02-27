// components/AlertModal.jsx
import React, { useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.95); }
  to { transform: scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.2s ease;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 480px;
  background: #fff;
  border-radius: 12px;
  animation: ${scaleIn} 0.2s ease;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
`;

const Header = styled.div`
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: ${({ $color }) => $color.bg};
  color: ${({ $color }) => $color.text};
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: ${({ $color }) => $color.text};
`;

const Body = styled.div`
  padding: 0 1.5rem 1rem;
  color: #4b5563;
`;

const Footer = styled.div`
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  border-top: 1px solid #e5e7eb;
`;

const Button = styled.button`
  padding: 0.5rem 1.4rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;

  ${({ variant, $color }) =>
    variant === "primary"
      ? `
        background: ${$color.text};
        color: #fff;
      `
      : `
        background: #f3f4f6;
        color: #374151;
      `}
`;

const COLOR_MAP = {
  success: { bg: "#d1fae5", text: "#059669" },
  warning: { bg: "#fef3c7", text: "#d97706" },
  error:   { bg: "#fee2e2", text: "#dc2626" },
  info:    { bg: "#e0e7ff", text: "#4338ca" },
};

const AlertModal = ({
  open,
  type = "info",
  title,
  message,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  onClose,
}) => {
  const color = COLOR_MAP[type] || COLOR_MAP.info;

  const escHandler = useCallback(
    (e) => e.key === "Escape" && onClose(),
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", escHandler);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", escHandler);
    };
  }, [open, escHandler]);

  if (!open) return null;

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Modal role="dialog" aria-modal="true">
        <Header>
          <Icon $color={color}>!</Icon>
          <div>
            <Title $color={color}>{title}</Title>
          </div>
        </Header>

        <Body>{message}</Body>

        <Footer>
          <Button onClick={onClose}>{cancelText}</Button>
          {onConfirm && (
            <Button
              variant="primary"
              $color={color}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          )}
        </Footer>
      </Modal>
    </Overlay>
  );
};

export default AlertModal;
