from confluent_kafka import Producer
import time

p = Producer({'bootstrap.servers': 'localhost:9092'})

def delivery_report(err, msg):
    if err:
        print(f'Message failed: {err}')
    else:
        print(f'Message delivered to {msg.topic()} [{msg.partition()}]')

for i in range(50000):
    p.produce('test-topic', key=str(i), value=f'Message {i}', callback=delivery_report)
    p.poll(0)

# Wait for outstanding messages to be delivered
p.flush()