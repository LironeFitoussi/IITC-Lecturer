import { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import CustomLink from './components/CustomLink'
import HighlightText from './components/HighlightText'
import Button from './components/Button'
import './App.css'

function App() {
  const [messageCount, setMessageCount] = useState(5)
  const [cartItems, setCartItems] = useState(3)
  const [cartTotal, setCartTotal] = useState(49.99)
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const username = "Alice"
  const email = "alice@example.com"
  const dynamicValue = "special value"
  const errorMessage = "Network timeout"

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Language Switcher */}
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <span>{t('language')}: </span>
        <button onClick={() => changeLanguage('en')} style={{ marginRight: '5px' }}>
          {t('english')}
        </button>
        <button onClick={() => changeLanguage('fr')}>
          {t('french')}
        </button>
      </div>

      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>{t('title')}</h1>

      {/* Example 1: Basic Trans with styled components */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Example 1: Basic Trans with Styling</h3>
        <p>
          <Trans 
            i18nKey="welcome_with_link"
            components={{
              1: <strong style={{ color: '#646cff' }} />,
              3: <em style={{ backgroundColor: '#ffeb3b', padding: '2px 4px' }} />
            }}
          />
        </p>
      </div>

      {/* Example 2: Trans with custom components and parameters */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Example 2: Custom Components + Parameters</h3>
        <p>
          <Trans 
            i18nKey="user_greeting"
            values={{ username, count: messageCount }}
            components={{
              1: <HighlightText color="#fff" backgroundColor="#28a745" />,
              3: <HighlightText color="#fff" backgroundColor="#dc3545" />
            }}
          />
        </p>
        <button onClick={() => setMessageCount(messageCount + 1)}>
          Add Message
        </button>
      </div>

      {/* Example 3: Trans with custom links */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Example 3: Custom Links</h3>
        <p>
          <Trans 
            i18nKey="terms_and_conditions"
            components={{
              1: <CustomLink href="/terms" onClick={() => alert('Terms clicked!')} />,
              3: <CustomLink href="/privacy" onClick={() => alert('Privacy clicked!')} />
            }}
          />
        </p>
      </div>

      {/* Example 4: Documentation link */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Example 4: Documentation Link</h3>
        <p>
          <Trans 
            i18nKey="documentation_link"
            components={{
              1: <CustomLink 
                   href="https://react.i18next.com/latest/trans-component" 
                   onClick={() => window.open('https://react.i18next.com/latest/trans-component', '_blank')}
                 />
            }}
          />
        </p>
      </div>

      {/* Example 5: Complex example with multiple components and dynamic values */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Example 5: Complex Mixed Components</h3>
        <p>
          <Trans 
            i18nKey="complex_example"
            values={{ dynamicValue }}
            components={{
              1: <strong style={{ fontWeight: 'bold', color: '#333' }} />,
              3: <CustomLink href="/custom" onClick={() => alert('Custom link clicked!')} />,
              5: <HighlightText color="#fff" backgroundColor="#ff5722" />
            }}
          />
        </p>
      </div>

      {/* Example 6: Nested components */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Example 6: Nested Components</h3>
        <p>
          <Trans 
            i18nKey="nested_components"
            components={{
              1: <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px', display: 'inline-block' }} />,
              3: <HighlightText color="#fff" backgroundColor="#9c27b0" />
            }}
          />
        </p>
      </div>

      {/* Example 7: Email verification with dynamic email */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Example 7: Email Verification</h3>
        <p>
          <Trans 
            i18nKey="email_verification"
            values={{ email }}
            components={{
              1: <code style={{ backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '3px' }} />,
              3: <CustomLink href="/verify" onClick={() => alert('Verification link clicked!')} />
            }}
          />
        </p>
      </div>

      {/* Example 8: Shopping cart with buttons */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Example 8: Shopping Cart with Button</h3>
        <p>
          <Trans 
            i18nKey="shopping_cart"
            values={{ itemCount: cartItems, total: cartTotal.toFixed(2) }}
            components={{
              1: <HighlightText color="#fff" backgroundColor="#2196f3" />,
              3: <HighlightText color="#fff" backgroundColor="#4caf50" />,
              5: <Button variant="success" onClick={() => alert('Checkout clicked!')} />
            }}
          />
        </p>
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => setCartItems(cartItems + 1)}>Add Item</button>
          <button onClick={() => setCartTotal(cartTotal + 9.99)} style={{ marginLeft: '10px' }}>
            Add $9.99
          </button>
        </div>
      </div>

      {/* Example 9: Error message with action buttons */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Example 9: Error Message with Actions</h3>
        <p>
          <Trans 
            i18nKey="error_message"
            values={{ errorMessage }}
            components={{
              1: <HighlightText color="#fff" backgroundColor="#f44336" />,
              3: <Button variant="secondary" size="small" onClick={() => alert('Retry clicked!')} />,
              5: <Button variant="primary" size="small" onClick={() => alert('Support contacted!')} />
            }}
          />
        </p>
      </div>

      {/* Interactive Counter */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <p style={{ fontSize: '18px', color: '#666' }}>
          Switch languages to see all examples translate instantly!
        </p>
      </div>
    </div>
  )
}

export default App
