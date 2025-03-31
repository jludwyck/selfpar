Success Page
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
// src/pages/Success.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Success() {
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      setError('No session ID found.');
      setLoading(false);
      return;
    }

    fetch(`/api/get-checkout-session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setSessionData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch session details.');
        setLoading(false);
      });
  }, [searchParams]);

  if (loading) return <div className="p-6 text-center">Loading order details...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4 text-center text-green-700">✅ Order Confirmed!</h1>
      <p className="text-center text-gray-700 mb-6">Thank you for your purchase, {sessionData.customer_details.name}!</p>

      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="divide-y divide-gray-200">
          {sessionData.line_items?.data.map((item) => (
            <li key={item.id} className="py-3 flex justify-between">
              <span>{item.description}</span>
              <span>
                {item.quantity} × ${(item.price.unit_amount / 100).toFixed(2)} = ${
                  ((item.price.unit_amount / 100) * item.quantity).toFixed(2)
                }
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-bold text-right text-lg">
          Total: ${(sessionData.amount_total / 100).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

