import styled from 'styled-components';

export const Colored = styled.span`
  damage {
    color: ${({ theme }) => theme.colors.critical};
    font-weight: 600;
  }

  heal {
    color: ${({ theme }) => theme.colors.heal};
    font-weight: 600;
  }

  buff {
    color: ${({ theme }) => theme.colors.buff};
    font-weight: 600;
  }

  curse {
    color: ${({ theme }) => theme.colors.curse};
    font-weight: 600;
  }
`;

export const Description = styled.div`
  margin-bottom: 16px;
`;

export const StackedEffectInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
