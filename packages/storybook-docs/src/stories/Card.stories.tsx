import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@bubblepop/ui-library';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4],
      description: 'Shadow depth of the card',
    },
    hoverable: {
      control: { type: 'boolean' },
      description: 'Enable hover effects',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
      description: 'Card padding size',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined'],
      description: 'Card style variant',
    },
    onClick: { 
      action: 'clicked',
      description: 'Click event handler',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Card Title</h3>
        <p style={{ margin: 0 }}>This is a default card component with medium padding and elevation 1.</p>
      </div>
    ),
    elevation: 1,
    padding: 'medium',
  },
};

export const NoElevation: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Flat Card</h3>
        <p style={{ margin: 0 }}>This card has no elevation (elevation=0) for a flat appearance.</p>
      </div>
    ),
    elevation: 0,
    padding: 'medium',
  },
};

export const MediumElevation: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Medium Shadow</h3>
        <p style={{ margin: 0 }}>This card has medium elevation (elevation=2) for a moderate shadow effect.</p>
      </div>
    ),
    elevation: 2,
    padding: 'medium',
  },
};

export const HighElevation: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>High Shadow</h3>
        <p style={{ margin: 0 }}>This card has high elevation (elevation=4) for a prominent shadow effect.</p>
      </div>
    ),
    elevation: 4,
    padding: 'medium',
  },
};

export const Hoverable: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Hoverable Card</h3>
        <p style={{ margin: 0 }}>Hover over this card to see the hover effect. The background color changes when hoverable is true.</p>
      </div>
    ),
    elevation: 2,
    hoverable: true,
    padding: 'medium',
  },
};

export const HoverableWithClick: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Interactive Card</h3>
        <p style={{ margin: 0 }}>This card is hoverable and clickable. The cursor changes to pointer when both hoverable and onClick are set.</p>
      </div>
    ),
    elevation: 2,
    hoverable: true,
    padding: 'medium',
    onClick: () => {},
  },
};

export const Outlined: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Outlined Card</h3>
        <p style={{ margin: 0 }}>This card uses the outlined variant with a border instead of shadow.</p>
      </div>
    ),
    variant: 'outlined',
    elevation: 0,
    padding: 'medium',
  },
};

export const OutlinedHoverable: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Outlined Hoverable</h3>
        <p style={{ margin: 0 }}>Hover over this outlined card to see the border color change.</p>
      </div>
    ),
    variant: 'outlined',
    elevation: 0,
    hoverable: true,
    padding: 'medium',
    onClick: () => {},
  },
};

export const SmallPadding: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Small Padding</h3>
        <p style={{ margin: 0 }}>This card has small padding (16px).</p>
      </div>
    ),
    elevation: 1,
    padding: 'small',
  },
};

export const LargePadding: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Large Padding</h3>
        <p style={{ margin: 0 }}>This card has large padding (32px) for more spacious content.</p>
      </div>
    ),
    elevation: 1,
    padding: 'large',
  },
};

export const NoPadding: Story = {
  args: {
    children: (
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>No Card Padding</h3>
        <p style={{ margin: 0 }}>This card has no padding, but the content has its own padding for demonstration.</p>
      </div>
    ),
    elevation: 1,
    padding: 'none',
  },
};

export const ComplexContent: Story = {
  args: {
    children: (
      <div>
        <img 
          src="https://via.placeholder.com/350x150/4CAF50/FFFFFF?text=Card+Image" 
          alt="Placeholder" 
          style={{ 
            width: '100%', 
            height: '150px', 
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '16px'
          }} 
        />
        <h3 style={{ margin: '0 0 8px 0' }}>Complex Card</h3>
        <p style={{ margin: '0 0 16px 0' }}>This card contains multiple elements including an image, title, text, and buttons.</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer' }}>
            Action 1
          </button>
          <button style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #4CAF50', backgroundColor: 'transparent', color: '#4CAF50', cursor: 'pointer' }}>
            Action 2
          </button>
        </div>
      </div>
    ),
    elevation: 2,
    hoverable: true,
    padding: 'medium',
    onClick: () => {},
  },
};