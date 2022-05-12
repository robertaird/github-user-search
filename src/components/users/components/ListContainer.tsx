import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

type ListContainerProps = {
  children: React.ReactNode;
};

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(1)}px;
  overflow: auto;
`;

const useHeightDifference = () => {
  const [heightDifference, setHeightDifference] = useState(0);
  const resizeObserver = useRef(
    new ResizeObserver((entries: ResizeObserverEntry[]) => {
      setHeightDifference(entries[0].target.clientHeight - window.innerHeight);
    }),
  );

  useEffect(() => {
    const currentObserver = resizeObserver.current;
    currentObserver.observe(document.body);
    return () => {
      currentObserver.disconnect();
    };
  }, []);

  return heightDifference;
};

export function ListContainer({ children }: ListContainerProps) {
  const heightDifference = useHeightDifference();

  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(
    null,
  );
  const containerRef = useCallback((node: HTMLDivElement) => {
    setContainerNode(node);
  }, []);

  useEffect(() => {
    if (containerNode !== null && containerNode instanceof Element) {
      containerNode.style.height = `${
        containerNode.clientHeight - heightDifference
      }px`;
    }
  }, [containerNode, heightDifference]);

  return <Container ref={containerRef}>{children}</Container>;
}

export default ListContainer;
