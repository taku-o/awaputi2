import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Card } from '@bubblepop/ui-library';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'カードコンポーネントは、関連するコンテンツをグループ化して表示するためのコンテナです。elevation、padding、variant などのプロパティをカスタマイズできます。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4],
      description: 'カードの影の深さを設定します（0: 影なし、4: 最大の影）',
      table: {
        type: { summary: '0 | 1 | 2 | 3 | 4' },
        defaultValue: { summary: '1' },
      },
    },
    hoverable: {
      control: { type: 'boolean' },
      description: 'ホバー時の視覚効果を有効にします',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
      description: 'カード内部のパディングサイズを設定します',
      table: {
        type: { summary: '"none" | "small" | "medium" | "large"' },
        defaultValue: { summary: '"medium"' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined'],
      description: 'カードのスタイルバリエーションを設定します',
      table: {
        type: { summary: '"default" | "outlined"' },
        defaultValue: { summary: '"default"' },
      },
    },
    onClick: { 
      action: 'clicked',
      description: 'カードクリック時のイベントハンドラー',
      table: {
        type: { summary: '() => void' },
      },
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
  parameters: {
    docs: {
      description: {
        story: '基本的なカードコンポーネントです。デフォルトの elevation (1) と padding (medium) を使用しています。',
      },
    },
  },
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>カードタイトル</h3>
        <p style={{ margin: 0 }}>デフォルトのカードコンポーネントです。標準的なパディング（medium）と影（elevation=1）を使用しています。</p>
      </div>
    ),
    elevation: 1,
    padding: 'medium',
  },
};

export const NoElevation: Story = {
  parameters: {
    docs: {
      description: {
        story: '影なしのフラットなカードです。elevation を 0 に設定することで、完全にフラットな外観を実現します。',
      },
    },
  },
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>フラットカード</h3>
        <p style={{ margin: 0 }}>影なしのフラットなカードです。elevation=0により完全に平面的な外観になります。</p>
      </div>
    ),
    elevation: 0,
    padding: 'medium',
  },
};

export const MediumElevation: Story = {
  parameters: {
    docs: {
      description: {
        story: '中程度の影を持つカードです。elevation を 2 に設定し、適度な立体感を演出します。',
      },
    },
  },
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>中程度の影</h3>
        <p style={{ margin: 0 }}>中程度の影（elevation=2）を持つカードです。適度な立体感を表現します。</p>
      </div>
    ),
    elevation: 2,
    padding: 'medium',
  },
};

export const HighElevation: Story = {
  parameters: {
    docs: {
      description: {
        story: '最大の影を持つカードです。elevation を 4 に設定し、強い立体感と視覚的な階層を表現します。',
      },
    },
  },
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>強い影</h3>
        <p style={{ margin: 0 }}>最大の影（elevation=4）を持つカードです。強い立体感と階層性を表現します。</p>
      </div>
    ),
    elevation: 4,
    padding: 'medium',
  },
};

export const Hoverable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'ホバー効果を持つインタラクティブなカードです。マウスオーバー時に背景色が変化し、ユーザーへの視覚的フィードバックを提供します。',
      },
    },
  },
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>ホバー可能なカード</h3>
        <p style={{ margin: 0 }}>このカードにマウスを重ねるとホバー効果が表示されます。hoverable=trueの時、背景色が変化します。</p>
      </div>
    ),
    elevation: 2,
    hoverable: true,
    padding: 'medium',
  },
};

export const HoverableWithClick: Story = {
  parameters: {
    docs: {
      description: {
        story: 'ホバー効果とクリックイベントを持つ完全にインタラクティブなカードです。カーソルがポインターに変わり、クリック可能であることを示します。',
      },
    },
  },
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>インタラクティブカード</h3>
        <p style={{ margin: 0 }}>ホバー効果とクリック可能な機能を持つカードです。hoverableとonClickの両方が設定されている時、カーソルがポインターに変わります。</p>
      </div>
    ),
    elevation: 2,
    hoverable: true,
    padding: 'medium',
    onClick: action('hoverable-card-clicked'),
  },
};

export const Outlined: Story = {
  parameters: {
    docs: {
      description: {
        story: 'アウトラインスタイルのカードです。影の代わりにボーダーを使用して、より軽い表現を実現します。',
      },
    },
  },
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>アウトラインカード</h3>
        <p style={{ margin: 0 }}>影の代わりにボーダーを使用するoutlinedバリアントのカードです。</p>
      </div>
    ),
    variant: 'outlined',
    elevation: 0,
    padding: 'medium',
  },
};

export const OutlinedHoverable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'ホバー効果を持つアウトラインカードです。マウスオーバー時にボーダーの色が変化し、インタラクティブな要素であることを表現します。',
      },
    },
  },
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>ホバー可能なアウトラインカード</h3>
        <p style={{ margin: 0 }}>このアウトラインカードにマウスを重ねるとボーダーの色が変化します。</p>
      </div>
    ),
    variant: 'outlined',
    elevation: 0,
    hoverable: true,
    padding: 'medium',
    onClick: action('outlined-hoverable-card-clicked'),
  },
};

export const SmallPadding: Story = {
  parameters: {
    docs: {
      description: {
        story: '小さいパディング（16px）を持つカードです。コンパクトなレイアウトや省スペースデザインに適しています。',
      },
    },
  },
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>小さいパディング</h3>
        <p style={{ margin: 0 }}>小さいパディング（16px）を持つカードです。</p>
      </div>
    ),
    elevation: 1,
    padding: 'small',
  },
};

export const LargePadding: Story = {
  parameters: {
    docs: {
      description: {
        story: '大きいパディング（32px）を持つカードです。余裕のあるレイアウトや読みやすさを重視したデザインに適しています。',
      },
    },
  },
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>大きいパディング</h3>
        <p style={{ margin: 0 }}>大きいパディング（32px）を持つカードです。より余裕のあるコンテンツ表示に適しています。</p>
      </div>
    ),
    elevation: 1,
    padding: 'large',
  },
};

export const NoPadding: Story = {
  parameters: {
    docs: {
      description: {
        story: 'パディングなしのカードです。コンテンツ側で独自のスペーシングを完全にコントロールしたい場合に使用します。',
      },
    },
  },
  args: {
    children: (
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>パディングなし</h3>
        <p style={{ margin: 0 }}>カード自体にパディングはありませんが、デモ用にコンテンツ側でパディングを設定しています。</p>
      </div>
    ),
    elevation: 1,
    padding: 'none',
  },
};

export const ComplexContent: Story = {
  parameters: {
    docs: {
      description: {
        story: '複雑なコンテンツを含むカードの例です。画像、タイトル、テキスト、ボタンなど、複数の要素を組み合わせた実用的なカードレイアウトを示しています。',
      },
    },
  },
  args: {
    children: (
      <div>
        <img 
          src="/placeholder-card.svg" 
          alt="Placeholder" 
          style={{ 
            width: '100%', 
            height: '150px', 
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '16px'
          }} 
        />
        <h3 style={{ margin: '0 0 8px 0' }}>複雑なカード</h3>
        <p style={{ margin: '0 0 16px 0' }}>画像、タイトル、テキスト、ボタンなど複数の要素を含むカードです。</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer' }}>
            アクション1
          </button>
          <button style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #4CAF50', backgroundColor: 'transparent', color: '#4CAF50', cursor: 'pointer' }}>
            アクション2
          </button>
        </div>
      </div>
    ),
    elevation: 2,
    hoverable: true,
    padding: 'medium',
    onClick: action('complex-card-clicked'),
  },
};