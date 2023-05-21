import { createRef, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (data: FormData) => Promise<void>;
}

interface FormData {
  image: string;
  name: string;
  price: number;
  description: string;
  available: boolean;
}

export function ModalAddFood({ isOpen, setIsOpen, handleAddFood }: ModalAddFoodProps) {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const formRef = createRef<FormHandles>();

  async function handleSubmit() {
    const data: FormData = {
      name,
      description,
      price,
      image,
      available: true
    }

    await handleAddFood(data);

    setName('');
    setDescription('');
    setPrice(0);
    setImage('');

    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" onChange={event => setImage(event.target.value)} />

        <Input name="name" placeholder="Ex: Moda Italiana" onChange={event => setName(event.target.value)} />
        <Input name="price" placeholder="Ex: 19.90" onChange={event => setPrice(event.target.value)} />

        <Input name="description" placeholder="Descrição" onChange={event => setDescription(event.target.value)} />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

