import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '@bubblepop/ui-library';
import { Card } from '@bubblepop/ui-library';
import { Typography } from '@mui/material';

// @ts-ignore
const meta = {
  title: 'Components/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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
      description: 'Maximum width of the container',
    },
    center: {
      control: 'boolean',
      description: 'Center the container horizontally',
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Padding inside the container',
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive padding',
    },
  },
} satisfies Meta<typeof Container>;

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
};

export const MaxWidthXS: Story = {
  args: {
    maxWidth: 'xs',
    center: true,
    padding: 'medium',
    responsive: false,
    children: <DemoContent />,
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
};

export const MaxWidthMD: Story = {
  args: {
    maxWidth: 'md',
    center: true,
    padding: 'medium',
    responsive: false,
    children: <DemoContent />,
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
};

export const MaxWidthXL: Story = {
  args: {
    maxWidth: 'xl',
    center: true,
    padding: 'medium',
    responsive: false,
    children: <DemoContent />,
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
};

export const Centered: Story = {
  args: {
    maxWidth: 'md',
    center: true,
    padding: 'medium',
    responsive: false,
    children: <DemoContent />,
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
};

export const SmallPadding: Story = {
  args: {
    maxWidth: 'lg',
    center: true,
    padding: 'small',
    responsive: false,
    children: <DemoContent />,
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
};

export const LargePadding: Story = {
  args: {
    maxWidth: 'lg',
    center: true,
    padding: 'large',
    responsive: false,
    children: <DemoContent />,
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
        story: 'Responsive padding adjusts based on viewport size. Try changing the viewport using the toolbar.',
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
};