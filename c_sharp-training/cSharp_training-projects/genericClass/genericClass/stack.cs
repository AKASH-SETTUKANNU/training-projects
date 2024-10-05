using System;
using System.Collections.Generic;

namespace genericClass
{
    public class Stack<T>
    {
        private List<T> elements = new List<T>();

        public void Push(T item)
        {
            elements.Add(item);
        }

        public T Pop()
        {
            if (elements.Count == 0)
            {
                throw new InvalidOperationException("Stack is empty.");
            }

            T item = elements[elements.Count - 1];
            elements.RemoveAt(elements.Count - 1);
            return item;
        }

        public T Peek()
        {
            if (elements.Count == 0)
            {
                throw new InvalidOperationException("Stack is empty.");
            }

            return elements[elements.Count - 1];
        }

        public int Count => elements.Count;

        public bool IsEmpty => elements.Count == 0;
    }
}
