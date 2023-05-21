import { createRef, useEffect, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface Food {
  id?: number,
  name: string;
  description: string,
  price: number,
  available: boolean,
  image: string
}

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: Food;
  handleUpdateFood: (food: Food) => Promise<void>;
}

export function ModalEditFood({ isOpen, setIsOpen, editingFood, handleUpdateFood }: ModalEditFoodProps) {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    setImage(editingFood.image);
    setName(editingFood.name);
    setPrice(editingFood.price);
    setDescription(editingFood.description);
  }, [editingFood]);

  const formRef = createRef<FormHandles>();

  async function handleSubmit() {
    const data: Food = {
      id: editingFood.id,
      name,
      description,
      price,
      image,
      available: editingFood.available
    }

    await handleUpdateFood(data);

    setName('');
    setDescription('');
    setPrice(0);
    setImage('');

    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" onChange={event => setImage(event.target.value)} />

        <Input name="name" placeholder="Ex: Moda Italiana" onChange={event => setName(event.target.value)} />
        <Input name="price" placeholder="Ex: 19.90" onChange={event => setPrice(event.target.value)} />

        <Input name="description" placeholder="Descrição" onChange={event => setDescription(event.target.value)} />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}