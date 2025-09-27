# Trans Component Examples

This project demonstrates advanced usage of the `<Trans>` component from react-i18next with custom components, links, and parameters.

## Key Features Demonstrated

### 1. Basic Trans with Styling
```jsx
<Trans 
  i18nKey="welcome_with_link"
  components={{
    1: <strong style={{ color: '#646cff' }} />,
    3: <em style={{ backgroundColor: '#ffeb3b', padding: '2px 4px' }} />
  }}
/>
```

### 2. Custom Components with Parameters
```jsx
<Trans 
  i18nKey="user_greeting"
  values={{ username, count: messageCount }}
  components={{
    1: <HighlightText color="#fff" backgroundColor="#28a745" />,
    3: <HighlightText color="#fff" backgroundColor="#dc3545" />
  }}
/>
```

### 3. Custom Links with Actions
```jsx
<Trans 
  i18nKey="terms_and_conditions"
  components={{
    1: <CustomLink href="/terms" onClick={() => alert('Terms clicked!')} />,
    3: <CustomLink href="/privacy" onClick={() => alert('Privacy clicked!')} />
  }}
/>
```

### 4. Interactive Buttons in Text
```jsx
<Trans 
  i18nKey="shopping_cart"
  values={{ itemCount: cartItems, total: cartTotal.toFixed(2) }}
  components={{
    1: <HighlightText color="#fff" backgroundColor="#2196f3" />,
    3: <HighlightText color="#fff" backgroundColor="#4caf50" />,
    5: <Button variant="success" onClick={() => alert('Checkout clicked!')} />
  }}
/>
```

## Translation File Format

In your translation files (en.json, fr.json), use numbered tags:

```json
{
  "user_greeting": "Hello <1>{{username}}</1>, you have <3>{{count}}</3> new messages!",
  "terms_and_conditions": "By clicking continue, you agree to our <1>Terms of Service</1> and <3>Privacy Policy</3>."
}
```

## Component Mapping

- `<1>`, `<3>`, `<5>` etc. correspond to the numbered components in the `components` prop
- Use odd numbers (1, 3, 5) for the opening tags
- Parameters like `{{username}}` are passed via the `values` prop

## Custom Components

The project includes three reusable components:

1. **CustomLink** - Styled link component with click handlers
2. **HighlightText** - Text highlighting with custom colors
3. **Button** - Styled button with variants (primary, secondary, success, danger)

## Running the Project

```bash
npm install
npm run dev
```

Switch between English and French to see all examples translate instantly while preserving the interactive functionality!
