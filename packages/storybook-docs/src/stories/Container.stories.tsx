import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '@bubblepop/ui-library';
import { Card } from '@bubblepop/ui-library';
import { Typography } from '@mui/material';

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Containerコンポーネントは、レイアウト制御とレスポンシブデザインを提供します。最大幅の制限、中央寄せ、パディング制御などの機能を持ち、様々な画面サイズに対応したレイアウトを実現します。ビューポートセレクターを使用して、各ブレークポイントでの表示を確認できます。',
      },
    },
    viewport: {
      viewports: {
        xs: {
          name: 'XS (444px)',
          styles: {
            width: '444px',
            height: '800px',
          },
        },
        sm: {
          name: 'SM (600px)',
          styles: {
            width: '600px',
            height: '800px',
          },
        },
        md: {
          name: 'MD (900px)',
          styles: {
            width: '900px',
            height: '800px',
          },
        },
        lg: {
          name: 'LG (1200px)',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
        xl: {
          name: 'XL (1536px)',
          styles: {
            width: '1536px',
            height: '800px',
          },
        },
      },
    },
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'コンテナの最大幅を設定します。各ブレークポイント（xs: 444px, sm: 600px, md: 900px, lg: 1200px, xl: 1536px）に対応し、falseで全幅表示になります。',
    },
    center: {
      control: 'boolean',
      description: '親要素内でコンテナを水平方向に中央寄せします。maxWidthと組み合わせて使用すると効果的です。',
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'コンテナ内部のパディングを制御します（none: 0, small: 8px, medium: 16px, large: 24px）。',
    },
    responsive: {
      control: 'boolean',
      description: 'レスポンシブパディングを有効にします。ビューポートサイズに応じてパディングが自動調整され、モバイルでは小さく、デスクトップでは大きくなります。',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => (
  <Card elevation={1}>
    <Typography variant="h6" gutterBottom>
      Container Content
    </Typography>
    <Typography variant="body1" paragraph>
      This is a demo content inside the Container component. 
      The container provides control over layout, padding, and maximum width.
    </Typography>
    <Typography variant="body2" color="text.secondary">
      You can test different viewport sizes using the viewport selector in the toolbar above.
    </Typography>
  </Card>
);

export const Default: Story = {
  args: {
    maxWidth: 'lg',
    center: false,
    padding: 'medium',
    responsive: false,
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'デフォルトのContainerコンポーネントです。最大幅lgで通常のパディングを持ちます。',
      },
    },
  },
};

export const MaxWidthXS: Story = {
  args: {
    maxWidth: 'xs',
    center: true,
    padding: 'medium',
    responsive: false,
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '最大幅を444px（XSサイズ）に制限したコンテナです。モバイル向けの狭いレイアウトに適しています。',
      },
    },
  },
};

export const MaxWidthSM: Story = {
  args: {
    maxWidth: 'sm',
    center: true,
    padding: 'medium',
    responsive: false,
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '最大幅を600px（SMサイズ）に制限したコンテナです。小型タブレット向けのレイアウトに適しています。',
      },
    },
  },
};

export const MaxWidthMD: Story = {
  args: {
    maxWidth: 'md',
    center: true,
    padding: 'medium',
    responsive: false,
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '最大幅を900px（MDサイズ）に制限したコンテナです。タブレットや小型デスクトップ向けのレイアウトに適しています。',
      },
    },
  },
};

export const MaxWidthLG: Story = {
  args: {
    maxWidth: 'lg',
    center: true,
    padding: 'medium',
    responsive: false,
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '最大幅を1200px（LGサイズ）に制限したコンテナです。標準的なデスクトップ向けのレイアウトに適しています。',
      },
    },
  },
};

export const MaxWidthXL: Story = {
  args: {
    maxWidth: 'xl',
    center: true,
    padding: 'medium',
    responsive: false,
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '最大幅を1536px（XLサイズ）に制限したコンテナです。大型デスクトップやワイドスクリーン向けのレイアウトに適しています。',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    maxWidth: false,
    center: false,
    padding: 'medium',
    responsive: false,
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '最大幅の制限を解除し、親要素の全幅を使用するコンテナです。フルスクリーンレイアウトに適しています。',
      },
    },
  },
};

export const Centered: Story = {
  args: {
    maxWidth: 'md',
    center: true,
    padding: 'medium',
    responsive: false,
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '親要素内で水平方向に中央寄せされたコンテナです。コンテンツを画面中央に配置する際に使用します。',
      },
    },
  },
};

export const NoPadding: Story = {
  args: {
    maxWidth: 'lg',
    center: true,
    padding: 'none',
    responsive: false,
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'パディングを持たないコンテナです。コンテンツを端まで配置したい場合に使用します。',
      },
    },
  },
};

export const SmallPadding: Story = {
  args: {
    maxWidth: 'lg',
    center: true,
    padding: 'small',
    responsive: false,
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '小さなパディング（8px）を持つコンテナです。コンパクトなレイアウトに適しています。',
      },
    },
  },
};

export const MediumPadding: Story = {
  args: {
    maxWidth: 'lg',
    center: true,
    padding: 'medium',
    responsive: false,
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '標準的なパディング（16px）を持つコンテナです。一般的なコンテンツレイアウトに適しています。',
      },
    },
  },
};

export const LargePadding: Story = {
  args: {
    maxWidth: 'lg',
    center: true,
    padding: 'large',
    responsive: false,
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: '大きなパディング（24px）を持つコンテナです。余白を多く取りたいレイアウトに適しています。',
      },
    },
  },
};

export const ResponsivePadding: Story = {
  args: {
    maxWidth: 'lg',
    center: true,
    padding: 'medium',
    responsive: true,
    children: <DemoContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'レスポンシブパディングを有効にしたコンテナです。ビューポートサイズに応じてパディングが自動調整されます。モバイルデバイスでは小さく、デスクトップでは大きくなります。ツールバーのビューポートセレクターで異なる画面サイズでの表示を確認できます。',
      },
    },
  },
};

export const MultipleCards: Story = {
  args: {
    maxWidth: 'md',
    center: true,
    padding: 'medium',
    responsive: false,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Card elevation={1}>
          <Typography variant="h6">Card 1</Typography>
          <Typography variant="body1">First card content</Typography>
        </Card>
        <Card elevation={2}>
          <Typography variant="h6">Card 2</Typography>
          <Typography variant="body1">Second card content</Typography>
        </Card>
        <Card elevation={3}>
          <Typography variant="h6">Card 3</Typography>
          <Typography variant="body1">Third card content</Typography>
        </Card>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '複数のカードコンポーネントを含むコンテナの例です。コンテナ内でのコンポーネントレイアウトと間隔の管理を示しています。',
      },
    },
  },
};