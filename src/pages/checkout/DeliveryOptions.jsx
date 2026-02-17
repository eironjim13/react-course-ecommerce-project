import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import axios from 'axios';

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
  const updateDeliveryOption = async (optionId) => {
    try {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        deliveryOptionId: optionId
      });
      await loadCart();
    } catch (error) {
      console.error('Failed to update delivery option:', error);
    }
  };

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>

      {deliveryOptions.map((option) => {
        const priceString = option.priceCents > 0
          ? `${formatMoney(option.priceCents)} - Shipping`
          : 'FREE Shipping';

        return (
          <div key={option.id} className="delivery-option">
            <input
              type="radio"
              checked={option.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
              onChange={() => updateDeliveryOption(option.id)}
            />

            <div>
              <div className="delivery-option-date">
                {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
              </div>

              <div className="delivery-option-price">
                {priceString}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
