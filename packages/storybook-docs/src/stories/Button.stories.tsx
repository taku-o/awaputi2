import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@bubblepop/ui-library';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '汎用的なボタンコンポーネント。ゲーム内の様々なアクションに使用されます。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'icon'],
      description: 'ボタンのバリエーション。primary（主要アクション）、secondary（副次的アクション）、icon（アイコンボタン）から選択',
      table: {
        type: { summary: 'primary | secondary | icon' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'ボタンのサイズ。small、medium、largeから選択',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      defaultValue: 'button',
      description: 'HTML buttonのtype属性',
      table: {
        type: { summary: 'button | submit | reset' },
        defaultValue: { summary: 'button' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'ボタンを無効化するかどうか',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'ボタンを親要素の幅いっぱいに広げるかどうか',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    startIcon: {
      control: { type: 'text' },
      description: 'ボタンテキストの前に表示するアイコン',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    endIcon: {
      control: { type: 'text' },
      description: 'ボタンテキストの後に表示するアイコン',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onClick: { 
      action: 'clicked',
      description: 'クリック時のイベントハンドラ',
      table: {
        type: { summary: '() => void' },
      },
    },
    children: {
      description: 'ボタンに表示するコンテンツ',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
  parameters: {
    docs: {
      description: {
        story: '主要なアクションに使用するプライマリボタン。ゲーム開始、ステージ選択などの重要な操作に使用されます。',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
  parameters: {
    docs: {
      description: {
        story: '副次的なアクションに使用するセカンダリボタン。キャンセル、戻るなどの補助的な操作に使用されます。',
      },
    },
  },
};

export const Icon: Story = {
  args: {
    variant: 'icon',
    children: '🎮',
  },
  parameters: {
    docs: {
      description: {
        story: 'アイコンのみを表示するボタン。設定、ヘルプなどのアイコンアクションに使用されます。',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
  parameters: {
    docs: {
      description: {
        story: '無効化されたボタン。条件を満たさない場合や処理中などでアクションを制限する際に使用されます。',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '親要素の幅いっぱいに広がるボタン。モバイル画面やモーダル内での主要アクションなどに使用されます。',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <Story />
      </div>
    ),
  ],
};