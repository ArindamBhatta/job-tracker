import { UserRepository } from './user.repo';
import { v4 as uuidv4 } from 'uuid';

async function main() {
  const repo = new UserRepository();
  const email = `test-${Date.now()}@example.com`;

  console.log('Creating user...');
  const user = await repo.create({
    id: uuidv4(),
    email: email,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deleted: false
  });
  console.log('User created:', user);

  console.log('Finding user by email...');
  const foundUser = await repo.findByEmail(email);
  console.log('Found user:', foundUser);

  if (foundUser?.email === email && foundUser instanceof (await import('../entity/user.entity')).UserEntity) {
    console.log('Verification SUCCESS');
  } else {
    console.error('Verification FAILED');
  }
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
