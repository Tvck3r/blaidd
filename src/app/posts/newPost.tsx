import { PlusIcon } from '@/src/components/icons'
import MutationResponseToast from '@/src/components/mutationResponseToast'
import { useCreatePost } from '@/src/hooks/queries/posts'
import { Button } from '@heroui/button'
import { Form } from '@heroui/form'
import { Input, Textarea } from '@heroui/input'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal'
import { FormEvent } from 'react'

export default function NewPost() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const submit = useCreatePost()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))

    console.log('data', data)
    submit.mutate(
      { title: data.title as string, content: data.content as string, published: true, authorId: null },
      {
        onSuccess: () => {
          console.log('Post created successfully')
          onOpenChange()
        },
      }
    )
  }

  return (
    <>
      <Button color="primary" onPress={onOpen} endContent={<PlusIcon />}>
        Add New
      </Button>
      <MutationResponseToast mutation={submit} errorMessage="Failed to create post" />
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <Form onSubmit={onSubmit}>
              <ModalHeader>New Post</ModalHeader>
              <ModalBody className="w-full max-w-xl">
                <Input label="Title" name="title" placeholder="Enter your title" variant="bordered" />
                <Textarea fullWidth label="Content" name="content" placeholder="Enter your content" />
              </ModalBody>
              <ModalFooter className="flex justify-end w-full">
                <Button color="primary" type="submit" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
